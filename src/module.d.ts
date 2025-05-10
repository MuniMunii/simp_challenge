interface HistoryProps {
  name: string | null;
  chat: string;
  date: string;
  new?:boolean
}
interface DummyTextProps {
  type: string;
  namaGroup: string;
  member?: string[];
  history: HistoryProps[];
}