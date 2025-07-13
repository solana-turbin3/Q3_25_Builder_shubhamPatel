#![allow(unexpected_cfgs)]
#![allow(deprecated)]
use anchor_lang::prelude::*;

declare_id!("DxP7yGqFbC1mcXsWSbUZvS9zCT1mmuqsTDhT3CApFB3z");

#[program]
pub mod vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    pub user: Signers<'info>,
    #[account(mut)]
    #[account]{
        init,
        payer = user,
        seeds =[b"state",user.key().as_ref()],
        bump,
        space=8 + VaultState::INIT_SPACE
    }
    pub vault_state: Account<'info,VaultState>
    pub vault: SystemAccount<'info>,
    pub system_program: Program<'info,System>

}

#[accounts]  // solana accounts macro
#[derive(InitSpace)]
pub struct VaultState{
    pub vault_bump:u8,
    pub state_bump:u8, 
}

// impl Space for VaultState{
//     const INIT_SPACE:usize = 8+1+1 // anchor discriminator = 8 + 1+1 vault and state bump
// }