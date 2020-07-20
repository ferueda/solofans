import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../GlobalState/AuthContext';
import useProtectedRoute from '../hooks/useProtectedRoute';

import * as ROUTES from '../constants/routes';

import Nav from '../components/shared/Nav';
import LogoHeader from '../components/shared/LogoHeader';
import Post from '../components/Post/Post';

const Home = () => {
	useProtectedRoute();

	return (
		<React.Fragment>
			<LogoHeader />
			<Nav />

			<Post />
			<p style={{ height: '100%' }}>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium quibusdam, debitis asperiores vel mollitia
				suscipit omnis consequatur quas repellendus cupiditate ea ducimus a ipsa dignissimos fugit, sit eum, aliquam
				incidunt. Dignissimos voluptates modi provident repellat eius explicabo cum. Fugiat sequi tenetur alias illum
				reiciendis pariatur itaque, quis dolorum fuga molestiae beatae minima similique mollitia quod illo veritatis
				iste quidem possimus. Perspiciatis pariatur perferendis asperiores! Error iste delectus odio nostrum, enim
				sapiente. Rerum tempora praesentium cum enim id recusandae explicabo ex iure, deleniti dolores, voluptatibus
				fuga excepturi ab? Assumenda, natus modi! Soluta, quo. Aut dolorem odio non labore autem, illo officiis, minima
				porro exercitationem vero dolore magnam nisi numquam maiores, hic in? Vero inventore voluptas perspiciatis
				quaerat explicabo saepe sint impedit? Soluta odit, asperiores itaque est excepturi numquam? Doloribus earum ea
				optio nostrum officiis at ducimus dolorum eveniet qui aliquam, accusamus quasi aspernatur totam, sapiente
				ratione illum architecto doloremque. Iure, necessitatibus. Ea est similique pariatur deserunt aspernatur alias
				soluta tempora blanditiis quae eius nisi, doloremque voluptatum nostrum id ipsa aut nemo mollitia atque
				necessitatibus, totam perferendis cumque, molestias odio inventore? Iste. Non blanditiis, corporis assumenda sed
				enim nemo cumque nihil aut, fugiat vitae ullam iure vel beatae pariatur ad ducimus aperiam ipsum eius quasi modi
				deleniti expedita optio aliquam placeat. Ipsum. Perspiciatis laborum eaque cumque maxime vel qui nostrum!
				Incidunt voluptates eum quis ipsa aspernatur in corrupti perspiciatis tempora impedit quaerat distinctio
				voluptas quo animi facere, necessitatibus tempore sed maiores labore? Quaerat at tenetur voluptas inventore!
				Earum hic, fugiat totam, vitae dolores eos, fuga veritatis eum aperiam impedit reprehenderit! Ipsam incidunt non
				rem, possimus quibusdam fuga at dicta. Adipisci, sed cum? Dicta nisi repellat nostrum, itaque totam optio ipsum
				delectus tenetur laborum adipisci, similique quod quisquam! Blanditiis, dolorum illum aliquam dolore
				voluptatibus quisquam fugit modi minus culpa quos veniam consequatur numquam. Culpa vel quae minus alias
				nesciunt mollitia, minima numquam, eveniet sint odit repudiandae labore fugiat amet sed. Facere placeat, ad
				saepe eos ullam asperiores nemo modi soluta excepturi ea nisi! Minima eaque ab recusandae esse velit libero
				itaque! Alias, fuga. Architecto tempora fugit ea consectetur non est? Dolorum eveniet esse perferendis
				dignissimos illum? Aliquam aspernatur ut consectetur. Consectetur, praesentium et. Adipisci, aliquam? Repellat
				officiis dignissimos tempore eos consequuntur accusamus dolores porro repudiandae necessitatibus consectetur.
				Voluptatibus tempore nobis quidem obcaecati sed quia eos, assumenda error sit alias nostrum laborum, doloribus
				omnis? Consequuntur, odit eius id excepturi sapiente sequi porro ullam hic facilis minima saepe sint, culpa cum
				sunt. Alias fugiat corporis explicabo, autem beatae ea error provident, modi nulla, quod consequuntur. Fugit
				excepturi unde optio laborum cupiditate voluptates, ex, necessitatibus voluptatibus, quos incidunt dignissimos?
				Ipsum nemo id distinctio, ad repudiandae aliquid quo aspernatur quaerat eaque nam eius omnis adipisci, placeat
				esse. Vitae, commodi repellendus tenetur quod magni quibusdam pariatur, quisquam nisi possimus optio
				consequuntur soluta repudiandae voluptate incidunt dolorum laboriosam aliquam sunt. Aspernatur hic sit illum
				earum error assumenda consectetur dolorum. Magnam voluptatibus similique libero nesciunt deserunt veniam, dolor
				voluptatum tempora, quasi ipsa fugiat magni? Neque cumque, ullam, ex, molestiae assumenda itaque vel impedit ut
				distinctio ab ipsa? Tempora, porro expedita! Vitae corporis eius asperiores ullam sequi inventore aliquid,
				reprehenderit alias voluptates rerum nisi perspiciatis, ducimus eos. Dolores dolorum esse debitis est deserunt
				unde minus labore dolore omnis. Error, quod beatae! Maxime vel quam laudantium modi molestiae, quod quas? Quae
				eligendi alias saepe nisi ipsa distinctio officiis atque consequatur, debitis animi. Amet quaerat provident
				accusamus nihil. Nisi aut illum veniam soluta! Maiores perferendis voluptas, voluptatem quia cupiditate in quis
				optio, laborum molestias veritatis commodi deserunt mollitia adipisci! Nobis magnam at perferendis neque odit
				velit, consequuntur, ipsa eum voluptas deleniti cumque a.
			</p>
		</React.Fragment>
	);
};

export default Home;
