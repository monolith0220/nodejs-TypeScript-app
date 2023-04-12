import { SetStateAction, useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type Fruit = {
	id: number;
	name: string;
	price: number;
	image: string;
};

const largeFont = css`
	font-size: 54px;

	@media (min-width: 768px) {
		font-size: 72px;
	}
`;

const container = css`
	width: 92%;
	max-width: 720px;
	margin: 0 auto;
`;

const text = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;

	& > p {
		font-size: 36px;
	}
`;

const App: React.FC = () => {
	const [fruits, setFruits] = useState<Fruit[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch("/api");
				const json: SetStateAction<Fruit[] | null> = await res.json();
				setFruits(json);
			} catch (e: unknown) {
				if (e instanceof Error) {
					console.error(e.message);
				}
			}
		};

		fetchData();
	}, []);

	return (
		<div css={container} className="fruitsList">
			<h1 css={largeFont}>Fruits Store</h1>

			{fruits?.map((fruit) => (
				<div key={fruit.id}>
					<figure>
						<img src={fruit.image} alt={fruit.name} />
					</figure>
					<div css={text}>
						<h2>{fruit.name}</h2>
						<p>{`${fruit.price}円`}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
