import css from "./SearchBox.module.css";

interface SearchBoxProps {
  text: string;
  onChange: (newChangeQuery: string) => void;
}

export default function SearchBox({ text, onChange }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);

  return (
    <input
      defaultValue={text}
      onChange={handleChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
