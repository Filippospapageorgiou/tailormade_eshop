<script lang="ts">
    import Navbar from "$lib/custom/navbar.svelte";
	import Hero from "$lib/sections/hero.svelte";
    import FeaturedProducts from "$lib/sections/FeaturedProducts.svelte";
	import FeatureCardExample from "$lib/custom/FeatureCard/FeatureCardExample.svelte";
    
    let { data } = $props();
    
</script>

<Navbar {data} />
<Hero />
<FeaturedProducts {data} />
<FeatureCardExample />