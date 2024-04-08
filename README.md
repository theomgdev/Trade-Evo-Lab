# Trade-Evo by Cahit Karahan

Trade-Evo is a simple trading simulation that I developed using Node.js, Express.js, Tailwind and HTMX. Simple simulation to evolutionally train recurrent neural networks to hodl, buy and sell according to indicators such as moving averages and relative strength index and to make a profit in the long run.

## How it works
- The simulation starts with a random population of agents. Each agent has a neural network with a random set of weights. Also each agent has a balance and a stock balance.
- Each agent moves step by step in the historical data of the stock. At each step, the agent decides to buy, sell or hodl according to the indicators and the current state of the agent.
- For each step, each agent spends 1 unit of balance for each neuron in the neural network. If the agent has no balance, the agent is eliminated.
- The agents that are eliminated are replaced by the child agents of the agents that have the highest balance.
- The child agents are created by mutating the weights of the parent agents. (No, crossover is used)
- Also every agent has a chance to mutate a new neuron in the neural network or to remove an existing neuron.
- The simulation continues until the maximum number of steps is reached.
- The agent with the highest balance at the end of the simulation is saved as the best agent.

## Features
- Historical data of any stock can be fetched from the API, also new data APIs can be added thanks to data adapters.
- The simulation can be started, stopped and reset.
- The simulation can be run step by step, real-time or headless.
- The simulation can be run with different parameters such as population size, mutation rate, etc.

## Installation

- Install Node.js
- Clone the repository
- Run `npm install` in the project directory
- Run `npm run dev` to start the server
- Open your browser and go to `http://localhost:3000`

## Usage

- Open your browser and go to `http://localhost:3000`
- Click on the `Get Data` button to get the historical data of any stock
- Click on the `Start Simulation` button to start the simulation
- Click on the `Stop Simulation` button to stop the simulation
- Click on the `Reset Simulation` button to reset the simulation

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

- Fork the repository
- Create your feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the branch (`git push origin feature/AmazingFeature`)
- Create a new Pull Request
- Wait for the review
- After the review, the pull request will be merged

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details