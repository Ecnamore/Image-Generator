import express, { response } from 'express'
import config from 'config'
import { engine } from 'express-handlebars'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: "OPENAPI_KEY"
})
const openai = new OpenAIApi(configuration)

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))

app.get('/', (_, res) => {
    res.render('index')
})

app.post('/', async (req, res) => {
    const prompt = req.body.prompt
    const size = req.body.size ?? '512x512'
    const number = req.body.number ?? 1

    try {
       const response = await openai.createImage({
            createImageRequest: CreateImageRequest
        })

        console.log(response)

        // Передача данных response в шаблон для отображения на клиенте
        res.render('index')   
    } catch (e) {
        // Передача сообщения об ошибке в шаблон для отображения на клиенте
        res.render('index', {
           error: e.message,
        })
    }
})

app.listen(3000, () => console.log('Server start...'))