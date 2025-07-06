import daysjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay} from "../form/schedules/load.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// Data atual para formatar o input
const inputToday = daysjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual e define a data minima como sendo a data atual
selectedDate.value = inputToday
selectedDate.min = inputToday


form.onsubmit = async (event) => {
    // Previne o comportamnto padrão de carregar a página.
    event.preventDefault()

    try {
        // Recuperando o nome do cliente.
        const name = clientName.value.trim()
        
        if(!name) {
           return alert("Por favor, informe o nome do cliente!")
            
        }

        // Recuperando o horario selecionado.
        const hourSelected = document.querySelector(".hour-selected")
        
        // Recuperando o horario selecionado.
        if(!hourSelected) {
            return alert("Por favor, selecione um horário!")
        }

        // Recupera somente a hora.
        const [hour] = hourSelected.innerText.split(":")
        
        // Insere a hora na data.
        const when = daysjs(selectedDate.value).add(hour, "hour")
        
        //Gera um ID.
        const id = new Date().getTime().toString();

        //faz o agendamento.
        await scheduleNew({
            id,
            name,
            when,
        })

        // Recarrega os agendamentos.
        await schedulesDay()

        // Limpa o input de nome do cliente.
        clientName.value = ""
    } catch (error) {
        alert("Não foi possível enviar o agendamento.")
        console.log(error)
    }
}