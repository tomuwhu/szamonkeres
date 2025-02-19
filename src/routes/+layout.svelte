<script>
    let { children, data } = $props()
    let user = $state(data.user)
    import { page } from '$app/stores'
    import { afterNavigate } from '$app/navigation'
	var path = $state($page.url.pathname)
    let menu = $derived([
        {felirat: "Kezdőoldal", link: "/"},
        {   felirat: user?.id ? "Kijelentkezés": "Bejelentkezés / Regisztráció", 
            link: "/demo/lucia"
        }
    ])
    afterNavigate(() => {
		path = $page.url.pathname
        user = data.user
  	})
</script>
<div class="ui black inverted pointing menu">
{#each menu as item} 
    <a class="item {item.link === path || item.link + "/login" === path ? 'active' : ''}" 
        href={item.link}>{item.felirat}
    </a>
{/each}
<div class="right menu">
    <div class="item">
        <div class="ui white icon input">
            <input type="text" placeholder="Search...">
            <i class="search link icon"></i>
        </div>
    </div>
</div>
</div>
{@render children()}