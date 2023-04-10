import { program } from 'commander'

program
    .option('-p, --port <port>', 'Puerto del servidor', 8080)
    .option('-m, --mode <mode>', 'Modo de trabajo', 'development')
    .parse(process.argv)

export default program