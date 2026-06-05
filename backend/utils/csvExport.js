// c:\Users\chand\Desktop\SHE_Foundation\backend\utils\csvExport.js
export const buildCsv = (contacts) => {
  const header = ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Date'];
  const rows = contacts.map((contact) => {
    const sanitizedMessage = contact.message.replace(/\r?\n/g, ' ').replace(/"/g, '""');
    return [
      contact._id,
      contact.name,
      contact.email,
      contact.phone,
      contact.subject,
      sanitizedMessage,
      contact.status,
      contact.createdAt.toISOString()
    ]
      .map((field) => `"${field}"`)
      .join(',');
  });
  return [header.join(','), ...rows].join('\n');
};
