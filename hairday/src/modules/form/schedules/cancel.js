import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../../services/schedule-cancel.js"
const periods = document.querySelectorAll(".period")


// Gera evento de click para cada lista (manha, tarde, noite).
periods.forEach((period) =>{
    // Caprura o evento de click na lista.
    period.addEventListener("click", async (event) => {
        if(event.target.classList.contains("cancel-icon")){
            // Obtem a Li pai do elemento clicado.
            const item = event.target.closest("Li")

            // Pega o id do agendamento para remover.
            const  id  = Number(item.dataset.id)
            
            
            // Confirma que o id foi selecionado.
            if(id){
                // Cpnfirma se o usuario deseja cancelar o agendamento.
                const isConfirm = confirm("Você tem certeza que deseja cancelar este agendamento?")

                if(isConfirm) {
                    // Faz a requisição na API para cancelar o agendamento.
                    await scheduleCancel({ id })

                    // Recarrega os agendamentos do dia.
                    schedulesDay()
                }
            }
        }
    })
})