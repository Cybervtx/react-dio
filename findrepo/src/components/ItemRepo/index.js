import { ItemContainer } from "./styles"

export const ItemRepo = ({repo, handleRemoveRepo}) => {

    const handleRemove = ()=> {
        handleRemoveRepo(repo.id)
    }

    return(
        <ItemContainer onClick={handleRemove}>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <a href={repo.html_url} target="_blank" rel="noreferrer">Ver Respositorios</a><br />
            <a href="#" className="remover">Remover</a>
            <hr></hr>
        </ItemContainer>
    )
}