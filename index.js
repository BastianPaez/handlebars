import express from 'express';
import { engine } from 'express-handlebars';
import { services } from './data/services.data.js';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.static('public'))

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views',path.join(__dirname, '/views'));

app.get('/:name', (req, res)=>{
    const nameUrl = req.params.name;
    if (nameUrl === 'home'){
        res.render('home', {title : 'Home title '});
    } else if (nameUrl === 'services'){
        res.render('services', {services});
    } else {
        res.render('404',{title : 'No se encuentra esta página'});
    }
})

app.get('/services/:name', (req, res) => {
    const nameUrl = req.params.name;

    const service = services.find( item =>  item.url === `/services/${nameUrl}`)

    if(service){
        res.render('service', {service})
    } else {
        res.render('404', {title: 'No se encuentra el servicio'});
    }
});

app.listen(3000, ()=>{
    console.log('http://localhost:3000')
})