import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Pokedex = () => {
	const { register, handleSubmit, reset } = useForm();
	const [pokemonData, setPokemonData] = useState([]);
	const [pokemonType, setPokemonType] = useState("");

	const onSubmit = (data) => {
		console.log(data);
		getPokemons(data.pokemon);
	};

	const getPokemons = async (pokemon) => {
		const toArray = [];
		try {
			console.log(`pokemon: ${pokemon}`);
			const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
			const res = await axios.get(url);
			console.log(res);
			toArray.push(res.data);
			setPokemonType(res.data.types[0].type.name);
			setPokemonData(toArray);
			reset();
		} catch (error) {
			console.log(`error: ${error}`);
		}
	};

	return (
		<div className='container'>
			<div className='card' style={{ width: "500px", margin: "auto" }}>
				<div className='card-header'>
					<form className='row' onSubmit={handleSubmit(onSubmit)}>
						<input
							className='form-control my-2'
							type='text'
							placeholder='search pokemon'
							{...register("pokemon", { required: false })}
						/>

						<button className='btn btn-light text-justify my-2'>Search</button>
					</form>
				</div>
				{pokemonData.map((data) => {
					return (
						<div className='data-container'>
							<img
								src={data.sprites["front_default"]}
								className='rounded mx-auto d-block'
								alt='PokemonImage'
							/>
							<div className='card-body'>
								<h5 className='card-title text-center'>
									{data.name.toUpperCase()}
								</h5>
								<p className='card-text'>
									{data.name[0].toUpperCase() + data.name.substring(1)} is a{" "}
									{pokemonType} type pokemon, with {data.base_experience} of
									base experience. Some of its attacks are:{" "}
									{
										data.moves[
											Math.floor(Math.random() * (data.moves.length + 1))
										].move.name
									}
									,{" "}
									{
										data.moves[
											Math.floor(Math.random() * (data.moves.length + 1))
										].move.name
									}
									,{" "}
									{
										data.moves[
											Math.floor(Math.random() * (data.moves.length + 1))
										].move.name
									}
									,{" "}
									{
										data.moves[
											Math.floor(Math.random() * (data.moves.length + 1))
										].move.name
									}
									,{" "}
									{
										data.moves[
											Math.floor(Math.random() * (data.moves.length + 1))
										].move.name
									}
									,{" "}
									{
										data.moves[
											Math.floor(Math.random() * (data.moves.length + 1))
										].move.name
									}
									,{" "}
									{
										data.moves[
											Math.floor(Math.random() * (data.moves.length + 1))
										].move.name
									}
									, among others.
								</p>
								<table className='table table-bordered'>
									<tbody>
										<tr>
											<th scope='row'>Pokemon Type</th>
											<td>{pokemonType}</td>
										</tr>
										<tr>
											<th scope='row'>Height</th>
											<td>{data.height * 3.9} "</td>
										</tr>
										<tr>
											<th scope='row'>Weight</th>
											<td>{Math.round(data.weight / 4.3)} lbs</td>
										</tr>
										<tr>
											<th scope='row'>Number of battles</th>
											<td>{data.game_indices.length}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Pokedex;
