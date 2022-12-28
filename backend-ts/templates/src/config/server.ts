import app from '../app'
import { PORT } from './environment'

app.listen(PORT, () => console.log('Listening on ' + PORT.toString()))
