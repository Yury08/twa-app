'use client'

import Image from 'next/image'
import { FC, useState } from 'react'

import coin_logo_main from '../../../public/coin_logo_main.svg'
import ticket from '../../../public/ticket.svg'
import { Navigation } from '../../components/nav/Navigation'

const Home: FC = () => {
	const [login, setLogin] = useState<string>('')
	const [score, setScore] = useState<number>(+10)

	return (
		<>
			<>
				<div className='header'>
					<div className='header__login'>
						<span className='header__login-ava'>Y</span>{' '}
						{/* первая буква имени */}
						<span className='header__login-text'>Yuri Kravzov</span>
					</div>

					<button>connect wallet</button>
				</div>

				<div className='main-content'>
					<div className='coin'>
						{/* {showText && <AnimationText value={score} />} */}
						<Image
							className='coin__main-img'
							src={coin_logo_main}
							width={250}
							height={250}
							alt='coin image'
						/>
						<h3 className='coin__balance'>5,240.000 KRC</h3>
						<p className='coin__text'>
							invite friends and completed tasks for{' '}
							<Image
								src={ticket}
								alt='ticket'
							/>
						</p>
					</div>

					<div className='game'>
						<h2 className='game__title'>Play game</h2>
						<span className='game__attempts'>10 </span>
						<Image
							src={ticket}
							alt='ticket'
						/>
					</div>

					<div className='farming__block'>
						<div className='farming'>
							<p className='farming__balance'>farming: 55.000 KRC</p>
							<p className='farming__timer'>01h 30m</p>
						</div>
					</div>

					<Navigation />
				</div>
			</>
		</>
	)
}

export default Home
