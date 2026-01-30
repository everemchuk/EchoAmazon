import styles from "./NewsCard.module.sass"

interface Props {
	image: string
	title: string
	description: string
	link: string
}

export default function NewsCard(props: Props) {
	return (
		<article class={styles["news-card"]}>
			<div
				class={styles["news-image"]}
				style={{ "background-image": `url('${props.image}')` }}
			></div>
			<div class={styles["news-content"]}>
				<h3>{props.title}</h3>
				<p>{props.description}</p>
				<a href={props.link} class={styles["read-more"]}>
					Read more
				</a>
			</div>
		</article>
	)
}
