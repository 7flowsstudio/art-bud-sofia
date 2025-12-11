// import Hero from "@/components/Main/Hero/Hero";
import Benefits from "@/components/Main/Benefits/Benefits";
import Call from "@/components/Main/Call/Call";
import Facts from "@/components/Main/Facts/Facts";
import Form from "@/components/Main/Form/Form";
import Gallery from "@/components/Main/Gallery/Gallery";
import Works from "@/components/Main/Works/Works";
import United from "@/components/United/United";

export default function Home() {
	return (
		<>
			<United />
			<Facts />
			<Works />
			<Benefits />
			<Call />
			<Gallery />
			<Form />
		</>
	);
}
