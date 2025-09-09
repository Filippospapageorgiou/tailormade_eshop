<script lang="ts">
    import Navbar from "$lib/custom/navbar.svelte";
	import Hero from "$lib/sections/hero.svelte";
    import FeaturedProducts from "$lib/sections/FeaturedProducts.svelte";
	import BentoTwoCollumn from "$lib/custom/BentoTwoCollumn.svelte";
    
    let { data } = $props();
    
</script>

<Navbar {data} />
<Hero />
<BentoTwoCollumn />
<FeaturedProducts />