<script>
  const { data } = $props();
  let urlap = $state(0);
  let kepnyitva = $state(0);
  let edittool = $state({});
</script>

<h1>Eszközök ({data.user?.name})</h1>
{#if urlap === 0}
  <button
    class="ui green small button"
    onclick={() => ((urlap = 1), (edittool = {}))}>Új eszköz</button
  >
{:else}
  <button class="ui blue small button" onclick={() => (urlap = 0)}
    >Űrlap bezárása (mentés nélkül)</button
  >
  <hr />
  <form action="?/ujeszkoz" method="POST">
    <input type="hidden" name="id" value={edittool.tools?.id || "-"} />
    <div class="ui input">
      <div class="ui label">Megnevezés</div>
      <input type="text" name="title" value={edittool.tools?.title} />
    </div>
    <div class="ui input">
      <div class="ui label">Leírás</div>
      <input
        type="text"
        name="description"
        value={edittool.tools?.description}
      />
    </div>
    <div class="ui input">
      <div class="ui label">Kép link</div>
      <input type="text" name="image" value={edittool.tools?.image} />
    </div>
    <div class="ui input">
      <div class="ui label">Sorozatszám</div>
      <input type="text" name="serialnum" value={edittool.tools?.serialnum} />
    </div>
    <div class="ui input">
      <div class="ui label">Felhasználó</div>
      <select class="ui dropdown" name="user" value={edittool.user?.id}>
        <option value="bea7vrfcextbcweh75lesymc">Nincs még senkinél</option>
        <option value={data.user.id}>{data.user.name}</option>
      </select>
    </div>
    <div class="ui divider"></div>
    <button class="ui green small button">Mentés</button>
  </form>
{/if}
<table class="ui table">
  <thead>
    <tr class="cica">
      <th>Megnevezés</th>
      <th>Leírás</th>
      <th>Sorozatszám</th>
      <th>Kinél van</th>
      <th>Funkciók</th>
    </tr>
  </thead>
  <tbody>
    {#each data.toolslist as tool}
      <tr
        class="ez {kepnyitva === tool.tools.id ? 'active' : ''}"
        onclick={() => {
          if (urlap !== 0) return
          kepnyitva = kepnyitva !== tool.tools.id ? tool.tools.id : 0
        }}
      >
        <td>{tool.tools?.title}</td>
        <td>{tool.tools?.description}</td>
        <td>{tool.tools?.serialnum}</td>
        <td>{tool.user?.name}</td>
        <td>
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <button class="edit"
            onclick={() => {
              urlap = 2;
              edittool = tool;
            }}
            >✍</button>
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <form class="delform" action="?/torles" method="POST">
            <input type="hidden" name="id" value={tool.tools.id} />
            <button class="edit">🗑</button>
          </form>
        </td>
      </tr>
      {#if kepnyitva === tool.tools.id}
        <tr>
          <td colspan="5" class="center">
            <img src={tool.tools.image} alt={tool.tools.description} />
          </td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>

<style>
  form.delform {
    display: inline;
  }
  tr.ez:hover {
    background-color: lightcyan;
  }
  tr.active td {
    background-color: lightcoral;
  }
  td.center {
    text-align: center;
  }
  tr {
    user-select: none;
    cursor: pointer;
  }
  img {
    height: 500px;
  }
  input,
  select {
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
  tr.cica th {
    background-color: rgb(128, 201, 240);
  }
  button.edit:hover {
    text-shadow: 1px 1px 4px black;
  }
  button.edit {
    cursor: pointer;
    font-size: 30px;
  }
</style>
