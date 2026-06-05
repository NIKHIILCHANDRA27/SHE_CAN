// c:\Users\chand\Desktop\SHE_Foundation\backend\controllers\contactController.js
import Contact from '../models/Contact.js';
import { parse } from 'node:url';

export const submitContact = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log('submitContact request body:', req.body);
    }
    const { name, email, phone, subject, message } = req.body;
    const contact = await Contact.create({ name, email, phone, subject, message });
    if (process.env.NODE_ENV !== 'production') {
      console.log('Contact created:', contact._id.toString(), contact.name, contact.email);
    }
    res.status(201).json({ message: 'Submission received successfully', contact });
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const status = req.query.status;
    const search = req.query.search ? req.query.search.trim() : '';
    const sortField = ['createdAt', 'name', 'status'].includes(req.query.sort) ? req.query.sort : 'createdAt';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;
    const filter = {};

    if (status && ['Pending', 'Reviewed', 'Resolved'].includes(status)) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ page, limit, total, contacts });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json({ contact });
  } catch (error) {
    next(error);
  }
};

export const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    contact.status = status;
    await contact.save();
    res.json({ message: 'Submission status updated', contact });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    await contact.deleteOne();
    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const exportContactsCsv = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    const csvHeader = 'ID,Name,Email,Phone,Subject,Message,Status,Date\n';
    const rows = contacts
      .map((contact) => {
        const escapedMessage = contact.message.replace(/\r?\n/g, ' ').replace(/\"/g, '""');
        return `${contact._id},"${contact.name}","${contact.email}","${contact.phone}","${contact.subject}","${escapedMessage}",${contact.status},${contact.createdAt.toISOString()}`;
      })
      .join('\n');

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename="submissions.csv"');
    res.send(csvHeader + rows);
  } catch (error) {
    next(error);
  }
};

export const getStatusStats = async (req, res, next) => {
  try {
    const pending = await Contact.countDocuments({ status: 'Pending' });
    const reviewed = await Contact.countDocuments({ status: 'Reviewed' });
    const resolved = await Contact.countDocuments({ status: 'Resolved' });
    res.json({ pending, reviewed, resolved, total: pending + reviewed + resolved });
  } catch (error) {
    next(error);
  }
};

export const getTrend = async (req, res, next) => {
  try {
    const now = new Date();
    const days = Array.from({ length: 7 }).map((_, index) => {
      const day = new Date(now);
      day.setDate(now.getDate() - (6 - index));
      day.setHours(0, 0, 0, 0);
      return day;
    });

    const startDate = new Date(days[0]);
    const trendData = await Contact.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    const counts = days.map((day) => {
      const found = trendData.find(
        (item) =>
          item._id.year === day.getFullYear() &&
          item._id.month === day.getMonth() + 1 &&
          item._id.day === day.getDate()
      );
      return { date: day.toISOString(), count: found ? found.count : 0 };
    });

    res.json({ trend: counts });
  } catch (error) {
    next(error);
  }
};
