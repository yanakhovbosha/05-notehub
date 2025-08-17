import axios from "axios";
import { Note } from "../types/note";
import { NoteFormValues } from "../components/NoteForm/NoteForm";

export interface NoteProps {
  notes: Note[];
  perPage: number;
  totalPages: number;
}

const notehubKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (
  search: string,
  page: number
): Promise<NoteProps> => {
  const response = await axios.get<NoteProps>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        search: search,
        page,
        perPage: 12,
      },
      headers: {
        Authorization: `Bearer ${notehubKey}`,
      },
    }
  );

  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${notehubKey}`,
      },
    }
  );
  return response.data;
};

export const createNote = async (createdAt: NoteFormValues): Promise<Note> => {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    createdAt,
    {
      headers: {
        Authorization: `Bearer ${notehubKey}`,
      },
    }
  );
  return response.data;
};
