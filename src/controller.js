import { nanoid } from "nanoid";
import { Note, notes } from "./notes.js";

export const createNote = (req, res) => {
  const { title = "untitled", tags, body } = req.body;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const note = new Note(title, tags, body, id, createdAt, updatedAt);

  notes.push(note);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return res.status(201).json({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
  } else {
    return res.status(500).json({
      status: "fail",
      message: "Catatan gagal ditambahkan",
      data: {
        notes,
      },
    });
  }
};

export const getNotes = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Data semua Note berhasil dimuat",
    data: { notes },
  });
};

export const getNoteById = (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);

  if (note) {
    return res.status(200).json({
      status: "success",
      message: "Data Note berhasil dimuat",
      data: { note },
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Gagal membuat Note / Note tidak ditemukan",
    data: null,
  });
};

export const updateNote = (req, res) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((data) => data.id === id);

  if (index < 0) {
    return res.status(404).json({
      status: "fail",
      message: "Catatan tidak ditemukan",
    });
  }

  notes[index] = { ...notes[index], title, tags, body, updatedAt };

  return res.status(200).json({
    status: "success",
    message: "Catatan berhasil diperbarui",
  });
};

export const deleteNote = (req, res) => {
  const { id } = req.params;

  const noteId = notes.findIndex((data) => data.id === id);

  if (noteId < 0) {
    return res.status(404).json({
      status: "fail",
      message: "Catatan tidak ditemukan",
    });
  }

  notes.splice(noteId, 1);

  return res.status(200).json({
    status: "fail",
    message: "Catatan berhasil dihapus",
    data: { notes },
  });
};
