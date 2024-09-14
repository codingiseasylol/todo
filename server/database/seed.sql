insert into user
    (username, passwordHash, created)
values
    ('john', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', now()) -- password is '123'
;

insert into todo
    (userId, title, completed, created)
values
    (1, 'Buy milk', null, now()),
    (1, 'Walk dog', null, now()),
    (1, 'Hate React', 1, now())
;