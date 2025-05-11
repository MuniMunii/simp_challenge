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
type LabelProps={type:'Important ASAP',color:'#E5F1FF'}|{type:'Offline Meeting',color:'#FDCFA4'}|{type:'Virtual Meeting',color:'#F9E9C3'}|{type:'ASAP',color:'#AFEBDB'}|{type:'Client Related',color:'#CBF1C2'}|{type:'Self Task',color:'#CFCEF9'}|{type:'Appointmens',color:'#F9E0FD'}|{type:'Court Related',color:'#9DD0ED'}
interface TaskProps{
  nameTask:string;
  date:string
  endDate:string
  checked:boolean
  task:string
  label?:LabelProps[]
}