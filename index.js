var board=[0,0,0,0,0,0,0,0,0];
var firstmove=[1,3,7,9];
var pos;
var player,opponent,user,cpu;

function play(id,index)
{
  $('#'+id).attr("onclick","");
  board[index-1]=player;
  $('#'+id).addClass(user);
  if(check(player,board))
    {
     $('.result').text("You win!");
     reset();
     return; 
    }
  if(!draw())
    {
      $('.result').text("Draw!Better luck next time.");
      reset();
      return;
    }
  var position=minimax(true,0);
  $('#b'+position).attr("onclick","");
  board[position-1]=opponent;
  $('#b'+position).addClass(cpu);
  if(check(opponent,board))
    {
     $('.result').text("I win!");
     reset();
     return; 
    }
  if(!draw())
    {
      $('.result').text("Draw!Better luck next time.");
      reset();
      return;
    }
}
function minimax(maximizing,depth)
{
   if(check(opponent,board))
     {
       return (100-depth);
     }
  if(check(player,board))
    {
      return (-100+depth);
    }
  if(!draw())
     {
       return 0;
     }
  if(maximizing===true)
    {
      var best=-100;
      for(var i=0;i<9;i++)
        {
          if(board[i]===0)
            {
              board[i]=opponent;
				      var value = minimax(false, depth + 1);
              if(value>best && depth===0)
                {
                  pos=i+1;
                }
				      best = Math.max(best,value);
              board[i]=0;
            }
        }
      if(depth===0)
        {
          return pos;
        }
      return best;
    }
  if(maximizing===false)
    {
      var b=100;
      for(var i=0;i<9;i++)
        {
          if(board[i]===0)
            {
              board[i]=player;
				      var v = minimax(true, depth + 1);
				      b = Math.min(b,v);
              board[i]=0;
            }
        }
      return b;
    }
}
function draw()
{
  var r=0;
  for(var i=0;i<9;i++)
    {
      if(board[i]===0)r++;
    }
  return r;
}
function check(p,array)
{
  for(var i=0;i<3;i++)
    {
      if(array[i]===p && array[i+3]===p && array[i+6]===p){return true;} 
    }
  if((array[0]===p && array[4]===p && array[8]===p) || (array[2]===p && array[4]===p && array[6]===p)){return true;}
  for(i=0;i<=6;i+=3)
    {
      if(array[i]===p && array[i+1]===p && array[i+2]===p){return true;} 
    }
  return false;
}
function reset()
{
  for(var i=1;i<=9;i++)
  {
    $('#b'+i).attr("onclick","");
  }
}
$(".fa-user-circle").click(function()
                          {
  $('.result').text("Result");
  for(var i=1;i<=9;i++)
    {
      board[i-1]=0;
      $('#b'+i).attr("onclick","play(this.id,"+i+")");
      $('#b'+i).removeClass('cross');
      $('#b'+i).removeClass('zero');
    }
  player='X';opponent='O';
  user="cross";cpu="zero";
});
$(".fa-desktop").click(function()
                          {
  $('.result').text("Result");
  for(var i=1;i<=9;i++)
    {
      board[i-1]=0;
      $('#b'+i).attr("onclick","play(this.id,"+i+")");
      $('#b'+i).removeClass('cross');
      $('#b'+i).removeClass('zero');
    }
  player='O';opponent='X';
  user="zero";cpu="cross";
  var f=Math.floor(Math.random() * 4);
  var k=firstmove[f];
  $('#b'+k).attr("onclick","");
  board[k-1]=opponent;
  $('#b'+k).addClass(cpu);
});