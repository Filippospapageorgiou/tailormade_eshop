<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
    import Navbar from "$lib/custom/navbar.svelte";
    
    let { data } = $props();
    
</script>

<Navbar {data} />
