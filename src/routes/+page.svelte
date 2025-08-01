<script lang="ts">
    import Navbar from "$lib/custom/navbar.svelte";
	import Hero from "$lib/sections/hero.svelte";
    
    let { data } = $props();
    
</script>

<Navbar {data} />
<Hero />