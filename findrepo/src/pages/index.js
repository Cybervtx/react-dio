import { useState } from 'react';
import gitlogo from '../assets/github.png'
import { Input } from '../components/Input';
import { ItemRepo } from '../components/ItemRepo';
import { Container } from './styles';
import { Button } from '../components/Button';
import { api } from '../services/api';


function App() {
  // estado para os valores inserido no input
  const [currentRepo, setCurrentRepo] = useState("");

  // estado da requisição dos repos no github
  const [repos, setRepos] = useState([]);

  // get no repo github
  const handleSearchRepo = async () => {
    try {
      // Faz a requisição para o GitHub API
      const { data } = await api.get(`repos/${currentRepo}`);
  
      // Verifica se o repositório tem um ID válido
      if (data?.id) {
        // Checa se o repositório já está na lista
        const isExist = repos.some(repo => repo.id === data.id);
        
        if (!isExist) {
          setRepos(prev => [...prev, data]);
          setCurrentRepo("");
          return;
        }
  
        alert("Repositório já inserido na lista!");
      }
  
    } catch (error) {
      // Verifica se o erro foi um 404 e exibe mensagem personalizada
      if (error.response && error.response.status === 404) {
        alert("Repositório não encontrado. Verifique o nome e tente novamente.");
      } else {
        alert("Ocorreu um erro ao buscar o repositório. Tente novamente mais tarde.");
      }
      console.error("Erro ao buscar repositório:", error);
    }
  };
  

  const handleRemoveRepo = (id) => {
    const newRepos = repos.filter(repo => repo.id !== id);
    setRepos(newRepos);
  }

  return (
    <Container>
      <img src={gitlogo} width={72} height={72} alt="github" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
      
    </Container>
  );
}

export default App;
