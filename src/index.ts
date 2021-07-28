import { DESTRUCTION } from 'dns';
import app from './app';
import { TimezoneEnum } from './provedor/enum/timezone.enum';
import { DateUtils } from './provedor/utils/date.utils';

const ambiente = process.env.NODE_ENV;
let urlOrigem: string = 'dev';

let PORT: number = Number(process.env.PORT) || 3000;
switch (ambiente) {
    case 'e2e':
        urlOrigem = 'e2e';
        PORT = 3001;
        break;
    case 'prod':
        urlOrigem = 'prod';
        PORT = 3000;
        break;
    default:
        urlOrigem = 'dev';
        PORT = 3002;
        break;
}
if (!PORT) {
    process.exit(1);
}

app.listen(PORT, () => console.log(`Ambiente de ${urlOrigem} port ${PORT}`));