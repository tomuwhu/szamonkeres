<script>
    const { data } = $props()
    let urlap = $state(0)
    let kepnyitva = $state(0)    
</script>
<h1>Eszközök ({data.user?.name})</h1>
{#if urlap === 0}
<button class="ui green small button" onclick={() => urlap=1}>Uj eszköz</button>
{/if}
{#if urlap === 1}
<button class="ui blue small button" onclick={() => urlap=0}>Űrlap bezárása (mentés nélkül)</button>
<hr>
<form action="?/ujeszkoz" method="POST">
        <div class="ui input">
            <div class="ui label">Megnevezés</div>
            <input type="text" name="title" />
        </div>
        <div class="ui input">
            <div class="ui label">Leírás</div>
            <input type="text" name="description" />
        </div>
        <div class="ui input">
            <div class="ui label">Kép link</div>
            <input type="text" name="image" />
        </div>
        <div class="ui input">
            <div class="ui label">Sorozatszám</div>
            <input type="text" name="serialnum" />
        </div>
        <div class="ui input">
            <div class="ui label">Felhasználó</div>
            <select class="ui dropdown" name="user">
                <option value={data.user.id}>{data.user.name}</option>
            </select>
        </div>
        <div class="ui divider"></div>
        <button class="ui green small button">Mentés</button>
    </form>
{/if}
<table class="ui table">
    <thead>
        <tr>
            <th>Megnevezés</th>
            <th>Leírás</th>
            <th>Sorozatszám</th>
        </tr>
    </thead>
    <tbody>
        {#each data.toolslist as tool}
        <tr class="{kepnyitva === tool.id ? 'active' : ''}" 
        onclick="{() => kepnyitva=kepnyitva?0:tool.id}">
            <td>{tool.title}</td>
            <td>{tool.description}</td>
            <td>{tool.serialnum}</td>
        </tr>
        {#if kepnyitva === tool.id}
        <tr>
            <td colspan="3" class="center">
                <img src="{tool.image}" alt="{tool.description}">
            </td>
        </tr>
        {/if}
    {/each}
    </tbody>
</table>
<style>
    tr.active td {
        background-color: lightcoral;
    }
    td.center {
        text-align: center;
    }
    tr {
        cursor: pointer;
    }
    img {
        height: 500px;
    }
    input, select {
        width: 300px;
    }
    div.label {
        width: 100px;
        text-align: left;
    }
    form {
        display: inline-block;
        width: 400px;
    }
</style>