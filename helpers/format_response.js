module.exports = (doc, type) => {
  switch (type) {
    case "project":
      return {
        id: doc._id,
        title: doc.title,
        author_id: doc.author_id,
        author_name: doc.author_name,
      };
    case "task":
      return {
        id: doc._id,
        note: doc.note,
        status: doc.status,
        project_id: doc.project_id,
      };
    default:
      return {};
  }
};
