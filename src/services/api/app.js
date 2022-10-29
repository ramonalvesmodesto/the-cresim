import axios from "axios"


export const itensSkillDataApi = async () => {
    const response = await axios.get('https://emilyspecht.github.io/the-cresim/itens-habilidades.json')
    return response.data 
}

export const employeesDataApi = async () => {
    const response = await axios.get('https://emilyspecht.github.io/the-cresim/empregos.json').data
    return response.data 
}

export const interactionsDataApi = async () => {
    const response = await axios.get('https://emilyspecht.github.io/the-cresim/interacoes.json').data
    return response.data 
}

export const cheatsDataApi = async () => {
    const response = await axios.get('https://emilyspecht.github.io/the-cresim/cheats.json').data
    return response.data 
}