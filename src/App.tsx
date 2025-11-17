import { useState } from 'react'
import './App.css'

function App() {
  const [dataNascimento, setDataNascimento] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [idade, setIdade] = useState<number | null>(null);

  const hoje = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  function calcular() {
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    if (!dataNascimento) {
      alert('Informe uma data de nascimento válida.');
      return;
    }

    const partesData = dataNascimento.split('-');
    const anoNascimento = parseInt(partesData[0], 10);
    const mesNascimento = parseInt(partesData[1], 10) - 1;
    const diaNascimento = parseInt(partesData[2], 10);

    const dataNasc = new Date(anoNascimento, mesNascimento, diaNascimento);
    dataNasc.setHours(0, 0, 0, 0);

    let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
      idade--;
    }

    setIdade(idade);
  }

  return (
    <>
      <div>
        <main className='container'>
          <h1>Calculadora de idade</h1>
        </main>

        <form className="form" onSubmit={(e) => { e.preventDefault(); calcular(); }}>
          <label>Nome completo: </label>
          <br />
          <input className="input" type="text" placeholder='Maria' required value={nomeCompleto} onChange={ (e) => setNomeCompleto(e.target.value)} />
          <br />
          <label>Data de nascimento: </label>
          <br />
          <input className="input" type="date" placeholder='01/01/2000' min="1900-01-01" max={hoje} value={dataNascimento} required onChange={ (e) => setDataNascimento(e.target.value)} />
          <br />
          <input className="button" type="submit" value="Calcular idade" />
        </form>

        <div className="result">
           <h2>Resultado:</h2>
          <p>Nome: {nomeCompleto || '—'}</p>
          <p>Idade: {idade !== null ? `${idade} anos` : '—'}</p>
         </div>
       
      </div>
     
    </>
  )
}

export default App
