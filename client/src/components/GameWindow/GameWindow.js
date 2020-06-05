import React from 'react';
import './GameWindow.scss';
import axios from 'axios';
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


class GameWindow extends React.Component {
	state = {
		currentQuestion: "",
		currentAnswer: "",
		img: question,
		index: "",
		currentState: "none",
		score: 0,
		sequence: 0
	}

	callQuestion = () => {
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
		]
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
		]
		let randomizer = Math.ceil(Math.random() * 12);
		let randomFruit = fruits[randomizer];
		console.log(randomFruit);
		axios
			.get(`http://localhost:5000/${randomFruit}`)
			.then(res => {
				console.log(res);
				this.setState({
					currentQuestion: res.data.fact,
					currentAnswer: res.data.fruit,
					index: randomizer
				})
			})
			.catch(err => {
				window.alert(err);
			})
	}

	submitHandler = e => {
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
		]
		e.preventDefault();
		if (this.state.currentAnswer === e.target.answer.value) {
			this.setState({
				img: fruitImage[this.state.index],
				score: this.state.score++
			})
		}
	}

	nextQuestion = e => {
		e.preventDefault();
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
				<form onSubmit={this.submitHandler}>
					<label for="answer">Pick a fruit to prove your worth</label>
					<input name='answer' type='text' placeholder='Fruit'/>
					<p>apple, banana, coconut, kiwi, lemon, lime, orange, pear</p>
					<p>watermelon, mango, pineapple, passion, strawberry</p>
					<button className='button' type='submit'>SUBMIT</button>
				</form>
				<button onSubmit={this.nextQuestion} className='button' type='submit'>NEXT QUESTION</button>
			</section>	
		)
	}
}

export default GameWindow;

