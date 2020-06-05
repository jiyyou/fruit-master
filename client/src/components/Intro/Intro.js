import React from 'react';
import './Intro.scss';
import { Link } from "react-router-dom";

function Intro() {
	
	return (
		<section className="intro">
			<h1 className='intro__title'>Fruit Master!</h1>
			<p className='intro__description'>Are You Worthy of The Title?</p>
			<Link to='/game'>
				<button className='button' type='submit'>BEGIN</button>
			</Link>
		</section>
	)
}

export default Intro;