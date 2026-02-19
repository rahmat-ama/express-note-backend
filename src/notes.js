export class Note {
  constructor(title, tags, body, id, createdAt, updatedAt) {
    this.title = title;
    this.tags = tags;
    this.body = body;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const notes = [];
