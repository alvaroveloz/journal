import { Typography } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography component='h1'>
        Nisi eu ad ipsum proident ipsum elit exercitation duis consectetur id
        ullamco deserunt sunt.
      </Typography> */}
      {/* <NothingSelectedView /> */}
      <NoteView />
    </JournalLayout>
  );
}
