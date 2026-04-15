import { useEffect, useState } from 'react';
import Header from '../Header';
import axios from 'axios';


function Form() {

    const [Campos, setCampos] = useState({
        txtNome: '',
        txtIdade: '0',
        cmbuf: '0'
});
    function handleInputChange(event) {
    const { name, value } = event.target;

    setCampos(prevState => ({
        ...prevState,
        [name]: value
    }));
}

    async function handleFormSubmit(event) {
    event.preventDefault();

    try {
        await axios.post('http://localhost:3001/pessoas', Campos);
        alert("Dados enviados com sucesso!");
    } catch (error) {
        console.error(error);
    }
}

    const [estados, setEstados] = useState([]);
    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            setEstados(response.data);
        });
    }, []);

    return (

        <div>
            <Header title="React Form" />
            <form onSubmit={handleFormSubmit}>
                <fieldset>
                    <legend>
                        <h2>Dados de Cadastro</h2>
                    </legend>

                    <div>
                        <label>Nome:
                            <input type="text" name="txtNome" id="txtNome" onChange={handleInputChange} />
                        </label>
                    </div>

                    <div>
                        <label>Idade:
                            <input type="number" name="txtIdade" id="txtIdade" onChange={handleInputChange} />
                        </label>
                    </div>

                    <div>
                        <label>UF:
                            <select name="cmbUF" id="cmbUF" onChange={handleInputChange}>
                                <option value="0">Selecione uma opção</option>
                                {estados.map(estado => (<option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>))}
                            </select>
                        </label>
                    </div>

                    <input type="submit" value="Salvar" />
                </fieldset>
            </form>

        </div>
    )
}

export default Form;


