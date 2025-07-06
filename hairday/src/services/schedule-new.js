import { apiConfig } from "./api-config.js"

export async function scheduleNew({ id, name, when }) {
    try {
        // Faz a requisição para enviar os daddos do agendamento.
       await fetch(`${apiConfig.baseURL}/schedules`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, name, when }),
       }) 
        
       // Exibe uma mensagem de agendamento realizado.
       alert("Serviço agendado com sucesso!") 
    } catch (error) {
        console.log(error)
        alert("não foi possível agendar o serviço, tente novamente mais tarde");
    }
}