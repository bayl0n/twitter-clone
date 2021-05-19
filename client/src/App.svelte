<script>
    let count = 0;

    let handleDecrement = () => {
        if(count > 0) {
            count--;
        }
    }

    let handleIncrement = () => {
        count++;
    }

    let handleReset = () => {
        count = 0;
    }
</script>

<main>
    <h1>Twitter Clone</h1>
    
    <p>Welcome to twitter clone by Nathan Baylon</p>

    <h2>The count is {count} </h2>

    <div>
        <button class="btn" on:click={handleDecrement}>-</button>
        <button class="btn" on:click={handleIncrement}>+</button>
        <button on:click={handleReset}>Reset</button>
    </div>
</main>

<style>
    .btn {
        width: 3rem;
    }

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>