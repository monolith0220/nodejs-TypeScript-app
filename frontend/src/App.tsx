import { SetStateAction, useEffect, useState } from "react";

type Fruit = {
	id: number;
	name: string;
	price: number;
	image: string;
};

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
		<div className="container fruitsList">
			<h1>Fruits Store</h1>

			{fruits?.map((fruit) => (
				<div key={fruit.id}>
					<figure>
						<img src={fruit.image} alt={fruit.name} />
					</figure>
					<div className="text">
						<h2>{fruit.name}</h2>
						<p>{`￥${fruit.price}`}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
