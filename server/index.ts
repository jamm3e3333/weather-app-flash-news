import chalk from 'chalk';
import app from './src/app';

const port = process.env.PORT;

app.listen(port, () => {
    console.log(chalk.inverse.greenBright.bold(`Server is listening on port ${port}`));
})