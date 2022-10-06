



test("Check if password is correct", ()=> {
    expect(comparePassword("password","$2a$10$bJs3diwJwAxAISenl/4bs.U370vn6sV/xYniyTXtN7l3f.sCB77qS")).toBe(true);

});

