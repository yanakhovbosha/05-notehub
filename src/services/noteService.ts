import axios from "axios";
import { Note } from "../types/note";

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

export const deleteNotes = async (noteId: string) => {
  const response = await axios.delete<NoteProps>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${notehubKey}`,
      },
    }
  );
  return response.data;
};

interface NoteFormProps {
  title: string;
  content?: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export const createNotes = async (newNotes: NoteFormProps) => {
  const response = await axios.post<NoteProps>(
    "https://notehub-public.goit.study/api/notes",
    newNotes,
    {
      headers: {
        Authorization: `Bearer ${notehubKey}`,
      },
    }
  );
  return response.data;
};
