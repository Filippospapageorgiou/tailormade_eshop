<script>
    import Eye from "lucide-svelte/icons/eye";
	import PackageSearch from "lucide-svelte/icons/package-search";
	import Settings from "lucide-svelte/icons/settings";
	import Features from "./Features.svelte";


  //  className="size-6 text-primary"
  let data = [
    {
      id: 1,
      title: "1. True Specialty",
      content:
        "Επιλέγουμε specialty καφέδες που βαθμολογούνται με 84+ πόντους, εστιάζοντας σε καθαρές, ισχυρές γεύσεις με χαρακτηριστικά που αποτυπώνουν την προέλευσή τους, συνεργαζόμενοι αποκλειστικά με αξιόπιστους συνεργάτες",
      image:
        "https://i.pinimg.com/736x/ca/aa/49/caaa49d386d84f2d037d0abcc919778f.jpg",
      icon: PackageSearch,
    },
    {
      id: 2,
      title: "2. Redefining Fresh",
      content:
        "Επιλέγουμε καφέδες κάθε τρίμηνο, σύμφωνα με τον κύκλο συγκομιδής κάθε χώρας, εξασφαλίζοντας ότι πάντα προσφέρουμε τους πιο φρέσκους κόκκους, διατηρώντας την ποιότητα και τη γεύση τους.",
      image:
        "https://i.pinimg.com/736x/a5/dc/0a/a5dc0af50d185b7f9111949b17e17e1a.jpg",
      icon: Settings,
    },
    {
      id: 3,
      title: "3. Secure Transactions",
      content:
        "Η εμπιστοσύνη είναι το παν για εμάς. Με ασφαλείς και απλές μεθόδους συναλλαγών, εξασφαλίζουμε ότι κάθε αγορά είναι εύκολη, γρήγορη και αξιόπιστη, κάνοντας την εμπιστοσύνη σας τη μεγαλύτερη προτεραιότητά μας.",
      image:
        "https://i.pinimg.com/736x/b1/b9/c2/b1b9c230143fb0d8540eabe5b74adf27.jpg",
      icon: Eye,
    },
  ];
</script>
<svelte:head>
		 <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<Features {data} />
