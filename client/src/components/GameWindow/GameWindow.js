import React from 'react';
import './GameWindow.scss';
import axios from 'axios';
import { Link } from "react-router-dom";
import apple from '../../assets/images/apple.png';
import banana from '../../assets/images/banana.png';
import coconut from '../../assets/images/coconut.png';
import kiwi from '../../assets/images/kiwi.png';
import lemon from '../../assets/images/lemon.png';
import lime from '../../assets/images/lime.png';
import orange from '../../assets/images/orange.png';
import pear from '../../assets/images/pear.png';
import watermelon from '../../assets/images/watermelon.png';
import mango from '../../assets/images/mango.png';
import pineapple from '../../assets/images/pineapple.png';
import passion from '../../assets/images/passion.png';
import strawberry from '../../assets/images/strawberry.png';
import question from '../../assets/images/question.png';
import crown from '../../assets/images/crown.png';

const fruitImage = [
	apple,
	banana,
	coconut,
	kiwi,
	lemon,
	lime,
	orange,
	pear,
	watermelon,
	mango,
	pineapple,
	passion,
	strawberry
];

const fruits = [
	'apple',
	'banana',
	'coconut',
	'kiwi',
	'lemon',
	'lime',
	'orange',
	'pear',
	'watermelon',
	'mango',
	'pineapple',
	'passion',
	'strawberry'
];


class GameWindow extends React.Component {
	state = {
		currentQuestion: "",
		currentAnswer: "",
		img: question,
		index: "",
		currentState: "none",
		score: 0,
		sequence: 0,
		correct: 'begin'
	}

	callQuestion = () => {
		let randomizer = Math.ceil(Math.random() * 12);
		let randomFruit = fruits[randomizer];
		axios
			.get(`http://localhost:5000/${randomFruit}`)
			.then(res => {
				this.setState({
					currentQuestion: res.data.fact,
					currentAnswer: res.data.fruit,
					index: randomizer,
					sequence: this.state.sequence+1,
					correct: '',
					img: question,
					correct: 'begin'
				})				
			})
			.catch(err => {
				window.alert(err);
			})
	}

	submitHandler = e => {
		e.preventDefault();
		if (this.state.currentAnswer === e.target.answer.value.toLowerCase()) {
			this.setState({
				img: fruitImage[this.state.index],
				score: this.state.score+1,
				correct: true
			}, () => {
				console.log(this.state.score);
			})			
		}
		else {
			this.setState({
				correct: false,
				img: fruitImage[this.state.index]
			})
		}

		e.target.reset();
	}

	finalScore = () => {
		if (this.state.score === 4) {
			return 'You are now crowned the Fruit Master!';
		}
		else if (this.state.score === 3) {
			return 'You may call yourself a Fruit Expert';
		}
		else if (this.state.score === 2) {
			return 'You shall go study more random fruit facts';
		}
		else if (this.state.score === 1) {
			return 'You shall not consume fruits for a week as punishment';
		}
		else if (this.state.score === 0) {
			return 'Shame! Please stay away from fruits.';
		}
	}

	callImage() {
		if (this.state.score === 4) {
			return crown;
		}
	}

	componentDidMount() {
		this.callQuestion();
	}

	render() {
		return (
			<section className="game">
				<h1 className='game__title'>Question</h1>
				<h2 className='game__question'>{this.state.currentQuestion}</h2>
				<img className='game__image' src={this.state.img} alt="" />
				<form onSubmit={this.submitHandler} className={`${this.state.correct === 'begin' ? '' : 'invisible'}`}>
					<label htmlFor="answer">Pick a fruit to prove your worth</label>
					<input name='answer' type='text' placeholder='Fruit' required/>
					<p>apple, banana, coconut, kiwi, lemon, lime, orange, pear</p>
					<p>watermelon, mango, pineapple, passion, strawberry</p>
					<button className='button' type='submit'>SUBMIT</button>
				</form>
				<button onClick={this.callQuestion} className='button' type='submit'>NEXT QUESTION</button>
				<div className={`${this.state.correct===true ? 'visible' : 'hidden'}`}>
					<h2>YUM! Correct Answer!</h2>
				</div>
				<div className={`${this.state.correct===false ? 'visible' : 'hidden'}`}>
					<h2>WRONG!</h2>
				</div>
				<div className={`${this.state.sequence >= 5 ? 'done' : 'hidden'}`} >
					<img className='game__image' src={this.callImage()} alt=""/>
					<h2>{this.finalScore()}</h2>
					<Link to='/'>GO BACK</Link>
				</div>
			</section>	
		)
	}
}

export default GameWindow;

