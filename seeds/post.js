exports.seed = function(knex, Promise) {

  const text1 = [
    "Sean Porter photographed two of my favorite films of 2016. Released first was Green Room, a brutal siege horror exercise, which we talked about earlier in the year, and the other is 20th Century Women, which, during comparison, he describes as “a coming of age, sun-drenched, family dramedy”. They could not be more different. Although, in terms of his approach to exposure, are relatively same. Sean deflates the conceptual stigma surrounding a fluid, less controlled set (and their practical limitations) and brings to light their ability to let intuition breathe. ",
  ].join("\n")

  const text2 = [
    `The Love Witch has promptly become requisite sustenance for cinephiles. As the obligatory end of the year lists come churning out, you’d be damned if you didn’t catch The Love Witch on most of them. It’s made the Best of 2016 lists of  the New Yorker, Timeout, L.A Weekly, Sheila O’Malley (of rogerebert.com), Rottentomatoes 100 Best Horror Films of All Time, The Rolling Stones Best Horror Films of 2016,  The Thrillist’s sexiest movies of 2016, Filmschoolrejects Best movie Fashion/Best Movies of 2016, and Business Insider’s 24 Best Movies you probably haven’t seen this year, etc…. etc...
The Love Witch looks like film’s just aren’t able to anymore. It’s a glammed up homage to its Vistavision/Technicolor idols -- its flawless aesthetic is pivotal and helps ascend the label of a love letter. I talked with, and learned much, from its veteran cinematographer M. David Mullen ASC on The Love Witch’s production. `,
  ].join("\n\n")

  const text3 = [
    `Moana is the story of a young Polynesian heir ineffably drawn to the one thing that her community opposes: venturing out into the ocean, like the little mermaid was so drawn to land, like a monster to Boo, and like an ambitious rat was to the culinary arts.
Moana Head of Animation Hyrum Osmand (Zootopia, Frozen, Wreck It Ralph, Tangled) and Story Artist David Derrick Jr. (How To Train Your Dragon, Flushed Away, Bee Movie) talked with the press in a roundtable before speaking to the visual arts students at the University of Denver. Tucked away in a corner of the university, David tapped into what made Moana so personal to him, allowing him to segue easily into the film’s themes of Polynesian ancestry and culture while Hyrum explored the unique challenges this particular film offered Disney’s elite animators.`,
  ].join("\n\n")

  return knex('comments').del()
    .then(() => knex('posts').del())
    .then(function () {
      return Promise.all([
        createPost(
          'Sean Porter D.P 20th Centurn Women interview',
          text1,
          'Aaron Hunt',
          'https://www.cinelinx.com/media/k2/items/cache/b13b2b358077c7b781fe22dc2889cd0a_XL.jpg',
          new Date(2017, 1, 10)
        ),
        createPost(
          'M. David Mullen ASC The Love Witch interview',
          text2,
          'Aaron Hunt',
          'https://www.cinelinx.com/media/k2/items/cache/7100a2cd530c68049b2ac2b05e30c358_XL.jpg',
          new Date(2017, 1, 4)
        ),
        createPost(
          "Head of animation Hyrum Osmond and story artist David Derrick Jr on Disney's latest: Moana",
          text3,
          'Aaron Hunt',
          'https://www.cinelinx.com/images/d0ctoraronaol.com/Moana/disneys-moana-animated-movie.jpg',
          new Date(2016, 11, 23)
        ),
      ])
    })
    .then(function (postIds) {
      return Promise.all([
        knex('comments').insert({post_id: postIds[0], content: 'Firsties!'}),
        knex('comments').insert({post_id: postIds[0], content: 'I did it for the lulz'}),
        knex('comments').insert({post_id: postIds[2], content: 'This comment thread is so lonely'}),
      ])
    })

  function createPost(title, body, author, image_url, created_at) {
    return knex('posts')
      .insert({title, body, author, image_url, created_at})
      .returning('id')
      .then(ids => ids[0])
  }
};
