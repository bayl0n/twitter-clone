<script>
    let todos = [];
    let value = "";

    const handleClick = () => {
        if (value) {
            todos = [...todos, value];
            value = "";
        }
    }
</script>

<div>
    <input bind:value={value} type="text"/>
    <button on:click={handleClick}>
        Add
    </button>

    <ol>
        {#each todos as todo}
            <li>{todo}</li>
        {/each}
    </ol>
</div>

<style>
    div {
        margin: 0 auto;
        max-width: 280px;
    }
</style>