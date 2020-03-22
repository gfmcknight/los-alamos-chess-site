
Profiles = {
    // Standard, medium level AI that uses all the heuristics
    // in the way that they were intended to be tuned. Notice
    // that it has a slight motivation to trade when all other
    // things are equal, but it otherwise strikes a balance
    // between defense and offense. Since everything is tuned
    // around this one AI, it definitely feels the most natural.
    Standard: {
        Self_Pawn_Value: 1.0,
        Self_Knight_Value: 3.0,
        Self_Rook_Value: 5.0,
        Self_Queen_Value: 9.0,
        Self_King_Value: 0.0,
        Opp_Pawn_Value: 1.01,
        Opp_Knight_Value: 3.01,
        Opp_Rook_Value: 5.01,
        Opp_Queen_Value: 9.01,
        Opp_King_Value: 0.0,
        King_Safety_Value: 0.02,
        King_Centrality_Value: 0.01,
        Mobility_Value: 0.01,
        Pawn_Push_Value: 0.01,
        King_Center_Cutoff: 24.0,
        Depth: 4.0,
        Q_Depth: 1.0,
        Target: 250.0,
    },
    // An AI meant to take risks and that encourages
    // trade, even when it means throwing away a few
    // pieces. The high Pawn_Push_Value and
    // Mobility_Value paired with no King_Safety_Value
    // and a high King_Center_Cutoff means that the AI
    // look like it's ready to pull the King out at any
    // time.
    //
    // This AI along with Doubter are the last of the real
    // personality that the engine can convey before its
    // depth gets too high to respond to variations in the
    // heuristics and starts destroying the player in
    // tactical tricks. They could probably use a Q_Depth of
    // 1, so that they're not so boneheadedly brazen/frantic,
    // if it's not too much for the casual player, but I'm
    // worried that they'll just become Standard B and Standard C
    // if they get too strong.
    Backbone: {
        Self_Pawn_Value: 0.9,
        Self_Knight_Value: 2.9,
        Self_Rook_Value: 4.5,
        Self_Queen_Value: 8.0,
        Self_King_Value: 0.0,
        Opp_Pawn_Value: 1.0,
        Opp_Knight_Value: 3.0,
        Opp_Rook_Value: 5.0,
        Opp_Queen_Value: 9.0,
        Opp_King_Value: 0.0,
        King_Safety_Value: 0.00,
        King_Centrality_Value: 0.01,
        Mobility_Value: 0.05,
        Pawn_Push_Value: 0.1,
        King_Center_Cutoff: 26.0,
        Depth: 3.0,
        Q_Depth: 0.0,
        Target: 250.0,
    },
    // This AI is meant to avoid trading material
    // unless it gets a really good trade, and be generally
    // defensive. Here, the AI has a normal Mobility_Value
    // and Pawn_Push_Value because if it didn't have any
    // motivation, the poor thing would never step out of
    // its own home, but the King_Center_Cutoff is very low
    // which means that an entire additional piece has to
    // disappear for this profile to bring its king forward
    // when compared to the Backbone.
    Doubter: {
        Self_Pawn_Value: 1.1,
        Self_Knight_Value: 3.1,
        Self_Rook_Value: 5.5,
        Self_Queen_Value: 10.0,
        Self_King_Value: 0.0,
        Opp_Pawn_Value: 1.0,
        Opp_Knight_Value: 3.0,
        Opp_Rook_Value: 5.0,
        Opp_Queen_Value: 9.0,
        Opp_King_Value: 0.0,
        King_Safety_Value: 0.05,
        King_Centrality_Value: 0.01,
        Mobility_Value: 0.01,
        Pawn_Push_Value: 0.01,
        King_Center_Cutoff: 22.0,
        Depth: 3.0,
        Q_Depth: 0.0,
        Target: 250.0,
    },
    // A tutorial AI that didn't look very far into
    // the future. I applied some tricks like setting
    // the value of pawns really low, and having the AI
    // relentlessly push them by giving it a high
    // Pawn_Push_Value, and then the AI doesn't think
    // about any other positional features.
    //
    // This is a really neat AI and shouldn't be relegated
    // to the bottom of the tutorial anymore
    Careless: {
        Self_Pawn_Value: 0.0,
        Self_Knight_Value: 3.0,
        Self_Rook_Value: 5.0,
        Self_Queen_Value: 14.0,
        Self_King_Value: 0.0,
        Opp_Pawn_Value: 0.5,
        Opp_Knight_Value: 3.0,
        Opp_Rook_Value: 5.0,
        Opp_Queen_Value: 9.0,
        Opp_King_Value: 0.0,
        King_Safety_Value: 0.0,
        King_Centrality_Value: 0.0,
        Mobility_Value: 0.0,
        Pawn_Push_Value: 0.1,
        King_Center_Cutoff: 24.0,
        Depth: 2.0,
        Q_Depth: 0.0,
        Target: 250.0,
    },
    // Standard AI, but with the highest reasonable
    // depth + some qdepth. This thing takes a long
    // time to process, but it destroys.
    Zenith: {
        Self_Pawn_Value: 1.0,
        Self_Knight_Value: 3.0,
        Self_Rook_Value: 5.0,
        Self_Queen_Value: 9.0,
        Self_King_Value: 0.0,
        Opp_Pawn_Value: 1.01,
        Opp_Knight_Value: 3.01,
        Opp_Rook_Value: 5.01,
        Opp_Queen_Value: 9.01,
        Opp_King_Value: 0.0,
        King_Safety_Value: 0.02,
        King_Centrality_Value: 0.01,
        Mobility_Value: 0.01,
        Pawn_Push_Value: 0.01,
        King_Center_Cutoff: 24.0,
        Depth: 6.0,
        Q_Depth: 2.0,
        Target: 250.0,
    },
    // AI type that only considers material, but
    // has a large depth to make up for it. In fact,
    // the depth is what plays the most into this trope
    // because that's what enables it to pull all the
    // tactics out.
    //
    // This AI really showcases the difference between
    // depth 4 and depth 5 (or how bad my heuristics
    // are) because this is where the AI gets much,
    // much stronger. Although, I have played a few games
    // where it refuses to develop its pieces while
    // messing around with just a couple, so maybe the
    // personality does work.
    Robotic : {
        Self_Pawn_Value: 1.0,
        Self_Knight_Value: 3.0,
        Self_Rook_Value: 5.0,
        Self_Queen_Value: 9.0,
        Self_King_Value: 0.0,
        Opp_Pawn_Value: 1.0,
        Opp_Knight_Value: 3.0,
        Opp_Rook_Value: 5.0,
        Opp_Queen_Value: 9.0,
        Opp_King_Value: 0.0,
        King_Safety_Value: 0.0,
        King_Centrality_Value: 0.0,
        Mobility_Value: 0.0,
        Pawn_Push_Value: 0.0,
        King_Center_Cutoff: 24.0,
        Depth: 5.0,
        Q_Depth: 0.0,
        Target: 250.0,
    },
    // Weak AI to play fun variations of Los Alamos chess against
    Awesome: {
        Self_Pawn_Value: 1.0,
        Self_Super_Pawn_Value: 1.0,
        Self_Knight_Value: 3.0,
        Self_Bishop_Value: 3.0,
        Self_Rook_Value: 5.0,
        Self_Arch_Bishop_Value: 8.0,
        Self_Queen_Value: 9.0,
        Self_Super_Queen_Value: 12.0,
        Self_King_Value: 0.0,
        Opp_Pawn_Value: 1.01,
        Opp_Super_Pawn_Value: 1.01,
        Opp_Knight_Value: 3.01,
        Opp_Bishop_Value: 3.01,
        Opp_Rook_Value: 5.01,
        Opp_Arch_Bishop_Value: 8.01,
        Opp_Queen_Value: 9.01,
        Opp_Super_Queen_Value: 12.01,
        Opp_King_Value: 0.0,
        King_Safety_Value: 0.02,
        King_Centrality_Value: 0.01,
        Mobility_Value: 0.01,
        Pawn_Push_Value: 0.01,
        King_Center_Cutoff: 24.0,
        Depth: 3.0,
        Q_Depth: 0.0,
        Target: 250.0,
    },
    // Stronger AI to play against where the ai has interesting
    // pieces.
    Challenge: {
        Self_Pawn_Value: 1.0,
        Self_Super_Pawn_Value: 1.0,
        Self_Knight_Value: 3.0,
        Self_Bishop_Value: 3.0,
        Self_Rook_Value: 5.0,
        Self_Arch_Bishop_Value: 8.0,
        Self_Queen_Value: 9.0,
        Self_Super_Queen_Value: 12.0,
        Self_King_Value: 0.0,
        Opp_Pawn_Value: 1.01,
        Opp_Super_Pawn_Value: 1.01,
        Opp_Knight_Value: 3.01,
        Opp_Bishop_Value: 3.01,
        Opp_Rook_Value: 5.01,
        Opp_Arch_Bishop_Value: 8.01,
        Opp_Queen_Value: 9.01,
        Opp_Super_Queen_Value: 12.01,
        Opp_King_Value: 0.0,
        King_Safety_Value: 0.02,
        King_Centrality_Value: 0.01,
        Mobility_Value: 0.01,
        Pawn_Push_Value: 0.01,
        King_Center_Cutoff: 24.0,
        Depth: 4.0,
        Q_Depth: 3.0,
        Target: 250.0,
    },
    // Similar to standard AI but with
    // special pieces to help the player
    // during the challenge, and no q depth
    Hint: {
        Self_Pawn_Value: 1.0,
        Self_Super_Pawn_Value: 1.0,
        Self_Knight_Value: 3.0,
        Self_Bishop_Value: 3.0,
        Self_Rook_Value: 5.0,
        Self_Arch_Bishop_Value: 8.0,
        Self_Queen_Value: 9.0,
        Self_Super_Queen_Value: 12.0,
        Self_King_Value: 0.0,
        Opp_Pawn_Value: 1.01,
        Opp_Super_Pawn_Value: 1.01,
        Opp_Knight_Value: 3.01,
        Opp_Bishop_Value: 3.01,
        Opp_Rook_Value: 5.01,
        Opp_Arch_Bishop_Value: 8.01,
        Opp_Queen_Value: 9.01,
        Opp_Super_Queen_Value: 12.01,
        Opp_King_Value: 0.0,
        King_Safety_Value: 0.02,
        King_Centrality_Value: 0.01,
        Mobility_Value: 0.01,
        Pawn_Push_Value: 0.01,
        King_Center_Cutoff: 24.0,
        Depth: 4.0,
        Q_Depth: 0.0,
        Target: 250.0,
    },
    // Also added in the push to make the AI easier to
    // beat for beginners
    Casual: {
        Self_Pawn_Value: 1.0,
        Self_Knight_Value: 3.0,
        Self_Rook_Value: 5.0,
        Self_Queen_Value: 9.0,
        Self_King_Value: 0.0,
        Opp_Pawn_Value: 1.01,
        Opp_Knight_Value: 3.01,
        Opp_Rook_Value: 5.01,
        Opp_Queen_Value: 9.01,
        Opp_King_Value: 0.0,
        King_Safety_Value: 0.02,
        King_Centrality_Value: 0.01,
        Mobility_Value: 0.01,
        Pawn_Push_Value: 0.01,
        King_Center_Cutoff: 24.0,
        Depth: 5.0,
        Q_Depth: 0.0,
        Target: 0.0,
    },
    // The strongest of the "learning" AI (it's on the front page
    // of the app, despite being made for training). It was added
    // in a campaign to make the AI easier for casual players
    Confident: {
        Self_Pawn_Value: 1.0,
        Self_Knight_Value: 3.0,
        Self_Rook_Value: 5.0,
        Self_Queen_Value: 9.0,
        Self_King_Value: 0.0,
        Opp_Pawn_Value: 1.01,
        Opp_Knight_Value: 3.01,
        Opp_Rook_Value: 5.01,
        Opp_Queen_Value: 9.01,
        Opp_King_Value: 0.0,
        King_Safety_Value: 0.02,
        King_Centrality_Value: 0.01,
        Mobility_Value: 0.01,
        Pawn_Push_Value: 0.01,
        King_Center_Cutoff: 24.0,
        Depth: 3.0,
        Q_Depth: 1.0,
        Target: 3.0,
    }
};
