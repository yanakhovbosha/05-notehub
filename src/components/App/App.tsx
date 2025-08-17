import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { fetchNotes, NoteProps } from "../../services/noteService";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NoteList from "../NoteList/NoteList";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery<NoteProps>({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = useDebouncedCallback(setSearchQuery, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={searchQuery} onChange={handleChange} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data?.notes && <NoteList notes={data?.notes ?? []} />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {isModalOpen && (
            <NoteForm
              initialValues={{ title: "", content: "", tag: "Todo" }}
              onClose={() => {
                setIsModalOpen(false);
              }}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
